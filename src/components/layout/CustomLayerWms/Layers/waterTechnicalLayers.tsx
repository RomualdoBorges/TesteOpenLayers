import { Layer } from '../../../../types';
import CustomIconLayer from '../../../common/CustomIconLayer';

const urlAgua = 'http://localhost:8080/geoserver/agua/wms';

export const waterTechnicalLayers: Layer[] = [
  {
    id: 'agua_conexoes',
    name: 'agua:conexoes',
    displayName: 'Conexões',
    url: urlAgua,
    layer: 'agua:conexoes',
    children: [
      {
        id: 'agua_conexoes_adaptador',
        name: 'agua:conexoes:adaptador',
        displayName: 'Adaptador',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=1' },
        icon: <CustomIconLayer name="adaptador" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_cap',
        name: 'agua:conexoes:cap',
        displayName: 'Cap',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=2' },
        icon: <CustomIconLayer name="cap" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_cruzeta',
        name: 'agua:conexoes:cruzeta',
        displayName: 'Cruzeta',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=3' },
        icon: <CustomIconLayer name="cruzeta" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_curva11_15',
        name: 'agua:conexoes:curva11_15',
        displayName: "Curva 11° 15'",
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=4' },
        icon: <CustomIconLayer name="curva_11_15" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_continuidade',
        name: 'agua:conexoes:continuidade',
        displayName: 'Cont. Indefinida',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=5' },
        icon: (
          <div
            style={{
              height: 15,
              width: 15,
              backgroundColor: '#4FEF23',
              border: '1px solid #ccc',
            }}
          />
        ),
      },
      {
        id: 'agua_conexoes_curva22_30',
        name: 'agua:conexoes:curva22_30',
        displayName: "Curva 22° 30'",
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=6' },
        icon: <CustomIconLayer name="curva_22_30" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_curva45',
        name: 'agua:conexoes:curva45',
        displayName: 'Curva 45°',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=7' },
        icon: <CustomIconLayer name="curva_45" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_curva90',
        name: 'agua:conexoes:curva90',
        displayName: 'Curva 90°',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=8' },
        icon: <CustomIconLayer name="curva_90" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_juncao_em_y',
        name: 'agua:conexoes:juncao_em_y',
        displayName: 'Junção em Y',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=9' },
        icon: <CustomIconLayer name="juncao" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_luva',
        name: 'agua:conexoes:luva',
        displayName: 'Luva',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=11' },
        icon: <CustomIconLayer name="luva" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_reducao',
        name: 'agua:conexoes:reducao',
        displayName: 'Redução',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=12' },
        icon: <CustomIconLayer name="reducao" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_te',
        name: 'agua:conexoes:te',
        displayName: 'TE',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=15' },
        icon: <CustomIconLayer name="te" height={15} width={15} />,
      },
      {
        id: 'agua_conexoes_continuidade_indefinida',
        name: 'agua:conexoes:continuidade_indefinida',
        displayName: 'Cont. Indefinida',
        url: urlAgua,
        layer: 'agua:conexoes',
        params: { CQL_FILTER: 'tipo_peca=10' },
        icon: (
          <div
            style={{
              height: 8,
              width: 8,
              backgroundColor: '#E1844B',
              borderRadius: '10px',
              border: '1px solid #ccc',
            }}
          />
        ),
      },
    ],
  },
  {
    id: 'agua_ligacoes',
    name: 'agua:ligacoes_custom',
    displayName: 'Ligações',
    url: urlAgua,
    layer: 'agua:ligacoes_custom',
    children: [
      {
        id: 'agua_ligacoes_cliente',
        name: 'agua:ligacoes_custom',
        displayName: 'Ligações única',
        url: urlAgua,
        layer: 'agua:ligacoes_custom',
        params: { CQL_FILTER: 'informacoes_clientes=1' },
        icon: (
          <div
            style={{
              height: 14,
              width: 14,
              backgroundColor: '#00FFE1',
              borderRadius: '10px',
              border: '1px solid gray',
            }}
          />
        ),
      },
      {
        id: 'agua_ligacoes_clientes',
        name: 'agua:ligacoes_custom',
        displayName: 'Ligação múltiplos',
        url: urlAgua,
        layer: 'agua:ligacoes_custom',
        params: { CQL_FILTER: 'informacoes_clientes>1' },
        icon: <CustomIconLayer name="ligacoes_multiplos_clientes" height={15} width={15} />,
      },
    ],
  },
  {
    id: 'agua_redes_agua',
    name: 'agua:redes_agua',
    displayName: 'Redes de Água',
    url: urlAgua,
    layer: 'agua:redes_agua',
    children: [
      {
        id: 'agua:redes_agua_distribuicao',
        name: 'agua:redes_agua:distribuicao',
        displayName: 'Distribuição',
        url: urlAgua,
        layer: 'agua:redes_agua',
        params: { CQL_FILTER: 'tipo_rede=1' },
        icon: (
          <div
            style={{
              height: 3,
              width: 20,
              backgroundColor: '#44ABFF',
            }}
          />
        ),
      },
      {
        id: 'agua:redes_agua_aducao',
        name: 'agua:redes_agua:aducao',
        displayName: 'Adução',
        url: urlAgua,
        layer: 'agua:redes_agua',
        params: { CQL_FILTER: 'tipo_rede=2' },
        icon: (
          <div
            style={{
              height: 3,
              width: 20,
              backgroundColor: '#0105FF',
            }}
          />
        ),
      },
      {
        id: 'agua:redes_agua_projetada',
        name: 'agua:redes_agua:projetada',
        displayName: 'Projetada',
        url: urlAgua,
        layer: 'agua:redes_agua',
        params: { CQL_FILTER: 'situacao_rede=2' },
        icon: (
          <div
            style={{
              height: 0,
              width: 20,
              borderTop: '3px dashed #407FD9',
            }}
          />
        ),
      },
      {
        id: 'agua:redes_agua_abandonada',
        name: 'agua:redes_agua:abandonada',
        displayName: 'Abandonada',
        url: urlAgua,
        layer: 'agua:redes_agua',
        params: { CQL_FILTER: 'situacao_rede=3' },
        icon: (
          <div
            style={{
              height: 3,
              width: 20,
              backgroundColor: '#F60ACB',
            }}
          />
        ),
      },
      {
        id: 'agua:redes_agua_nao_definida',
        name: 'agua:redes_agua:nao_definida',
        displayName: 'Não definida',
        url: urlAgua,
        layer: 'agua:redes_agua',
        params: { CQL_FILTER: 'tipo_rede=0' },
        icon: (
          <div
            style={{
              height: 3,
              width: 20,
              backgroundColor: '#7D8B8F',
            }}
          />
        ),
      },
    ],
  },
  {
    id: 'agua_valvulas',
    name: 'agua:valvulas',
    displayName: 'Válvulas',
    url: urlAgua,
    layer: 'agua:valvulas',
    icon: <CustomIconLayer name="valvula_gaveta" height={15} width={15} />,
  },
];
