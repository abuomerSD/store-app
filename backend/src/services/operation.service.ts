import { OperationModel } from "../models/operation.model";
import { IOperation } from "../types";

const findAll = async (): Promise<IOperation[] | null> => {
  const operations: IOperation[] | null = await OperationModel.find();
  if (operations) {
    return operations;
  }
  return null;
};

const findById = async (id: string): Promise<IOperation | null> => {
  const operation: IOperation | null = await OperationModel.findById(id);
  return operation;
};

const save = async (operation: IOperation) => {
  const saved = await OperationModel.create(operation);
  return saved;
};

const updateById = async (
  id: string,
  operation: IOperation
): Promise<IOperation | null> => {
  const updated: IOperation | null = await OperationModel.findOneAndUpdate(
    { _id: id },
    operation
  );
  return updated;
};

const deleteById = async (id: string): Promise<IOperation | null> => {
  const deleted: IOperation | null = await OperationModel.findOneAndDelete({
    _id: id,
  });
  return deleted;
};

const operationService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default operationService;
