import { IUnitDefinition } from "../types";
import { UnitDefinitionModel } from "../models/unitDefinition.model";

const findAll = async (): Promise<IUnitDefinition[] | null> => {
  const units = await UnitDefinitionModel.find();
  if (units) {
    return units;
  }
  return null;
};

const findById = async (id: string): Promise<IUnitDefinition | null> => {
  const unit = await UnitDefinitionModel.findById(id);
  return unit;
};

const save = async (unit: IUnitDefinition): Promise<IUnitDefinition> => {
  const saved = await UnitDefinitionModel.create(unit);
  return saved;
};

const updateById = async (
  id: string,
  unit: IUnitDefinition
): Promise<IUnitDefinition | null> => {
  const updated = await UnitDefinitionModel.findOneAndUpdate({ _id: id }, unit);
  return updated;
};

const deleteById = async (id: string): Promise<IUnitDefinition | null> => {
  const deleted = await UnitDefinitionModel.findOneAndDelete({ _id: id });
  return deleted;
};

const unitDefinitionService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};

export default unitDefinitionService;
