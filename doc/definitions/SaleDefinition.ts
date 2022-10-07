import { Product } from "./productDefinition";

const Sale = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    descricao: {
      type: "string",
    },
    dia_semana: {
      type: "string",
    },
    preco: {
      type: "decimal",
      format: "int64",
    },
    inicio: {
      type: "number",
      format: "currency"
    },
    encerramento: {
      type: "number",
      format: "currency"
    },
    ativa: {
      type: "string",
    },
    produto: Product
  },
};

const SaleCreate = {
  type: "object",
  properties: {
    descricao: {
      type: "string",
    },
    dia_semana: {
      type: "string",
    },
    inicio: {
      type: "number",
      format: "currency"
    },
    encerramento: {
      type: "number",
      format: "currency"
    },
    ativa: {
      type: "string",
    },
    produto: {
      type: "integer",
      format: "int64",
    },
  },
};


export { Sale, SaleCreate };