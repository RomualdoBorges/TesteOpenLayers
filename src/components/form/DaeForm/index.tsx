import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { DaeResponse } from '../../../types';
import { searchDae } from '../../../services/SearchService/searchService';

interface FormData {
  daeNumber: string;
}

const DaeForm: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [markerAdded, setMarkerAdded] = useState(false);
  const [showError, setShowError] = useState(false);
  const { addMarker, clearMarkers } = useMarkerMap();

  const daeNumber = watch('daeNumber');

  const onSubmit = async (data: FormData) => {
    try {
      const response: DaeResponse = await searchDae(data.daeNumber);
      const coordinates = response.type.features[0].geometry.coordinates;

      if (coordinates.length > 0) {
        addMarker(coordinates);
        setMarkerAdded(true);
        setInputsDisabled(true);
      } else {
        setShowError(true);
        setValue('daeNumber', '');
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setShowError(true);
      setValue('daeNumber', '');
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleClear = () => {
    clearMarkers();
    setMarkerAdded(false);
    setInputsDisabled(false); // Habilitar os inputs novamente
    setValue('daeNumber', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="dae-form" style={{ display: 'flex', gap: '15px' }}>
        <Box display="flex" gap="10px">
          <Controller
            name="daeNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Digite o código DAE"
                size="small"
                variant="outlined"
                style={{ width: '250px' }}
                disabled={inputsDisabled} // Desabilitar quando inputsDisabled for true
              />
            )}
          />
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
              disabled={!daeNumber || inputsDisabled}
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

export default DaeForm;
