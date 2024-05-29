// Enum de Áreas de Conhecimento
export enum AreaOfKnowledgeEnum {
  CIENCIAS = "CIENCIAS",
  CIENCIAS_HUMANAS = "CIENCIAS_HUMANAS",
  CIENCIAS_HUMA_TEC = "CIENCIAS_HUMA_TEC",
  CIENCIAS_NATUREZA = "CIENCIAS_NATUREZA",
  ENSINO_RELIGIOSO = "ENSINO_RELIGIOSO",
  LINGUAGENS = "LINGUAGENS",
  LINGUAGENS_CODIGOS = "LINGUAGENS_CODIGOS",
  MATEMATICA = "MATEMATICA",
  MATEMATICA_TECNOLOGIAS = "MATEMATICA_TECNOLOGIAS"
}

// Interface para Detalhes da Área de Conhecimento
export interface AreaOfKnowledgeDetails {
  areaName: string;
  acronymName: string;
  keyArea: string;
}

// Mapeamento dos Detalhes da Área de Conhecimento
export const AreaOfKnowledgeDetailsMap: { [key in AreaOfKnowledgeEnum]: AreaOfKnowledgeDetails } = {
  [AreaOfKnowledgeEnum.CIENCIAS]: { areaName: "Ciências da Natureza", acronymName: "CI", keyArea: "CIENCIAS" },
  [AreaOfKnowledgeEnum.CIENCIAS_HUMANAS]: { areaName: "Ciências Humanas", acronymName: "CH", keyArea: "CIENCIAS_HUMANAS" },
  [AreaOfKnowledgeEnum.CIENCIAS_HUMA_TEC]: { areaName: "Ciências Humanas e Suas Tecnologias", acronymName: "CHST", keyArea: "CIENCIAS_HUMA_TEC" },
  [AreaOfKnowledgeEnum.CIENCIAS_NATUREZA]: { areaName: "Ciências da Natureza e Suas Tecnologias", acronymName: "CNST", keyArea: "CIENCIAS_NATUREZA" },
  [AreaOfKnowledgeEnum.ENSINO_RELIGIOSO]: { areaName: "Ensino Religioso", acronymName: "ER", keyArea: "ENSINO_RELIGIOSO" },
  [AreaOfKnowledgeEnum.LINGUAGENS]: { areaName: "Linguagens", acronymName: "LING", keyArea: "LINGUAGENS" },
  [AreaOfKnowledgeEnum.LINGUAGENS_CODIGOS]: { areaName: "Linguagens, Códigos e Suas Tecnologias", acronymName: "LCST", keyArea: "LINGUAGENS_CODIGOS" },
  [AreaOfKnowledgeEnum.MATEMATICA]: { areaName: "Matemática", acronymName: "MAT", keyArea: "MATEMATICA" },
  [AreaOfKnowledgeEnum.MATEMATICA_TECNOLOGIAS]: { areaName: "Matemática e Suas Tecnologias", acronymName: "MST", keyArea: "MATEMATICA_TECNOLOGIAS" }
};
