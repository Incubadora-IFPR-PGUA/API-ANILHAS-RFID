export const excluirCliente = async (req: Request, res: Response) => {
  try {
    const clienteId = parseInt(req.params.idCliente, 10);

    // Verifica se o cliente existe
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    // Verifica se o cliente possui pedidos vinculados
    const pedidosDoCliente = await Pedido.findAll({ where: { id_cliente: clienteId } });
    if (pedidosDoCliente.length > 0) {
      return res.status(400).json({ message: "Não é possível excluir o cliente, pois há pedidos vinculados a ele." });
    }

    // Se não houver pedidos vinculados, procede com a exclusão
    await cliente.destroy();
    res.json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).json({ message: "Erro ao excluir cliente" });
  }
};