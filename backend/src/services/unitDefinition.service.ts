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

const paginate = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const units = await UnitDefinitionModel.find()
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total_rows = (await UnitDefinitionModel.find()).length;
  return {
    total_rows,
    units,
  };
};

const unitDefinitionService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginate,
};

export default unitDefinitionService;
