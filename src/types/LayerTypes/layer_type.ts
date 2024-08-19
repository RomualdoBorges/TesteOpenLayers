import React from 'react';
import { Map as OLMap } from 'ol';

export interface Layer {
  id: string;
  name: string;
  displayName: string;
  url: string;
  layer: string;
  icon?: React.ReactNode;
  params?: { [key: string]: string };
  children?: Layer[];
}

export interface CustomLayersWmsProps {
  map: OLMap;
}
