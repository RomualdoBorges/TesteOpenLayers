import { useContext } from 'react';
import { MarkerMapContext, MarkerMapContextType } from '../context/MarkerMapContext';

export const useMarkerMap = (): MarkerMapContextType => {
  const context = useContext(MarkerMapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
