import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { Alert, Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { CruzamentoResponse, IptuResponse } from '../../../types';
import { searchCruzamento, searchIptu } from '../../../services/SearchService/searchService';

interface FormData {
  setor: string;
  quadra: string;
  lote: string;
}

const IptuForm: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [markerAdded, setMarkerAdded] = useState(false);
  const [showError, setShowError] = useState(false);
  const { addMarker, clearMarkers } = useMarkerMap();

  const setorNumber = watch('setor');
  const quadraNumber = watch('quadra');
  const loteNumber = watch('lote');

  const fields = [
    { name: 'setor', placeholder: 'Setor' },
    { name: 'quadra', placeholder: 'Quadra' },
    { name: 'lote', placeholder: 'Lote' },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      let response: CruzamentoResponse | IptuResponse;
      if (loteNumber === '') {
        response = await searchCruzamento(data.setor, data.quadra);
      } else {
        response = await searchIptu(data.setor, data.quadra, data.lote);
      }
      const coordinates = response.type.features[0].geometry.coordinates;

      if (coordinates.length > 0) {
        addMarker(coordinates);
        setMarkerAdded(true);
        setInputsDisabled(true);
      } else {
        setShowError(true);
        setValue('setor', '');
        setValue('quadra', '');
        setValue('lote', '');
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } catch (error) {
      setShowError(true);
      setValue('setor', '');
      setValue('quadra', '');
      setValue('lote', '');
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleClear = () => {
    clearMarkers();
    setMarkerAdded(false);
    setInputsDisabled(false);
    setValue('setor', '');
    setValue('quadra', '');
    setValue('lote', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="iptu-form" style={{ display: 'flex', gap: '15px' }}>
        <Box display="flex" gap="10px">
          {fields.map((fieldConfig) => (
            <Controller
              key={fieldConfig.name}
              name={fieldConfig.name as keyof FormData}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder={fieldConfig.placeholder}
                  size="small"
                  variant="outlined"
                  style={{ width: '130px' }}
                  disabled={inputsDisabled}
                />
              )}
            />
          ))}

          {markerAdded ? (
            <Button
              aria-label="delete"
              variant="contained"
              onClick={handleClear}
              sx={{ backgroundColor: '#f44336', height: '40px', width: '30px' }}
            >
              <DeleteIcon style={{ color: '#ffffff' }} />
            </Button>
          ) : (
            <Button
              aria-label="search"
              variant="contained"
              type="submit"
              sx={{ backgroundColor: '#5ABEEC', height: '40px', width: '30px' }}
              disabled={!setorNumber || !quadraNumber || inputsDisabled}
            >
              <SearchIcon style={{ color: '#ffffff' }} />
            </Button>
          )}
        </Box>
      </form>

      {showError && (
        <Alert
          severity="error"
          variant="filled"
          style={{
            position: 'absolute',
            right: '-218px',
            borderRadius: '2px',
            padding: '9px',
          }}
        >
          Número não encontrado!
        </Alert>
      )}
    </>
  );
};

export default IptuForm;
