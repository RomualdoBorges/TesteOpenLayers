import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMarkerMap } from '../../../hooks/useMarkerMap';
import { getDmcVrp, searchDmcVrp } from '../../../services/SearchService/searchService';
import { DmcVrp, DmcVrpResponse } from '../../../types';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

interface FormData {
  dmc: string;
}

const DmcVrpForm: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormData>();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<DmcVrp[]>([]);
  const [showError, setShowError] = useState(false);
  const [markerAdded, setMarkerAdded] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const { clearLayers, addDmcVrp } = useMarkerMap();

  const dmc = watch('dmc');

  useEffect(() => {
    if (inputValue.length > 1) {
      const fetchData = async () => {
        try {
          const dmcVrp = await getDmcVrp(inputValue);
          setOptions(dmcVrp);
        } catch (error) {
          console.log('Erro fetching data:', error);
        }
      };
      fetchData();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(dmc || '');
  }, [dmc]);

  const onSubmit = async (data: FormData) => {
    try {
      const response: DmcVrpResponse = await searchDmcVrp(data.dmc);
      const fid = response.type.features[0].properties.fid;
      console.log(fid);

      if (fid !== undefined) {
        addDmcVrp(fid);
        setMarkerAdded(true);
        setInputsDisabled(true);
      } else {
        setShowError(true);
        setValue('dmc', '');
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } catch (error) {
      setShowError(true);
      setValue('dmc', '');
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      console.log(error);
    }
  };

  const handleClear = () => {
    clearLayers();
    setMarkerAdded(false);
    setInputsDisabled(false);
    setValue('dmc', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="dmc-form" style={{ display: 'flex', gap: '15px' }}>
        <Box display="flex" gap="10px">
          <Controller
            name="dmc"
            control={control}
            defaultValue=""
            render={() => (
              <Autocomplete
                freeSolo
                disableClearable
                disabled={inputsDisabled} // Desabilitar quando inputsDisabled for true
                options={options.map((option) => option.codigo_nome)}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue);
                  setValue('dmc', newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Digite o número ou nome da DMC/VPR"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    style={{ width: '350px' }}
                    size="small"
                    disabled={inputsDisabled}
                  />
                )}
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
              disabled={!dmc || inputsDisabled}
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

export default DmcVrpForm;
