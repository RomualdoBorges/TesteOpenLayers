import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Autocomplete, Alert } from '@mui/material';
import { searchEndereco, getEnderecos } from '../../../services/SearchService/searchService';
import { Endereco, EnderecoResponse } from '../../../types';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMarkerMap } from '../../../hooks/useMarkerMap';

interface FormData {
  endereco: string;
  numero: string;
}

const AddressForm: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Endereco[]>([]);
  const [showError, setShowError] = useState(false);
  const [markerAdded, setMarkerAdded] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const { addMarker, clearMarkers } = useMarkerMap();

  const endereco = watch('endereco');
  const numero = watch('numero');

  useEffect(() => {
    if (inputValue.length > 2) {
      const fetchData = async () => {
        try {
          const enderecos = await getEnderecos(inputValue);
          setOptions(enderecos);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(endereco || '');
  }, [endereco]);

  const onSubmit = async (data: FormData) => {
    try {
      const response: EnderecoResponse = await searchEndereco(data.endereco, data.numero);
      addMarker(response.type.features[0].geometry.coordinates);
      setMarkerAdded(true);
      setInputsDisabled(true);
    } catch (error) {
      setShowError(true);
      setValue('endereco', '');
      setValue('numero', '');
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleClear = () => {
    clearMarkers();
    setMarkerAdded(false);
    setInputsDisabled(false); // Habilitar os inputs novamente
    setValue('endereco', '');
    setValue('numero', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="address-form" style={{ display: 'flex', gap: '15px' }}>
        <Box display="flex" gap="10px">
          <Controller
            name="endereco"
            control={control}
            defaultValue=""
            render={() => (
              <Autocomplete
                freeSolo
                disableClearable
                disabled={inputsDisabled} // Desabilitar quando inputsDisabled for true
                options={options.map((option) => option.logradouro)}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue);
                  setValue('endereco', newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Digite o nome da rua"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    style={{ width: '300px' }}
                    size="small"
                    disabled={inputsDisabled} // Desabilitar quando inputsDisabled for true
                  />
                )}
              />
            )}
          />
          <Controller
            name="numero"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Número"
                size="small"
                variant="outlined"
                style={{ width: '100px' }}
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
              disabled={!endereco || !numero || inputsDisabled} // Desabilitar o botão de submit se inputsDisabled for true
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

export default AddressForm;
