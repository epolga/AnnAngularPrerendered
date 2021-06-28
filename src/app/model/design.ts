export interface Design {
  DesignID: number;
  Caption: string;
  Description: string;
  ImageUrl: string;
  FacebookUrl: string;
  DownloadParams: string;
  DesignUrl: string;
  IsAuthenticated: boolean;
  IsAdministrator: boolean;
  Title: string;
}

export function sortDesignesByDesignId(d1: Design, d2: Design) {
  return d1.DesignID - d2.DesignID;
}
