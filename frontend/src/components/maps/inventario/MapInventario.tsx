'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { OptionType, Select } from '../../ui/Select';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useAuthContext } from '@/context/AuthContext';
import { RootState } from '@/redux/store';
import { MinimapControl, MinimapPosition } from '../MinimapControl';
import { GeoJsonInventario, GeoJsonShapeUt } from './GeoJson';
import { setUt } from '@/redux/features/utSlice';
import { setUpa } from '@/redux/features/upaSlice';
import { setUmf } from '@/redux/features/umfSlice';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { PoaContext } from '@/context/PoaContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/styles.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getGeoJson } from '@/services/arvore';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/imgs/leaflet/marker-icon-2x.png',
  iconUrl: '/imgs/leaflet/marker-icon.png',
  shadowUrl: '/imgs/leaflet/marker-shadow.png',
});

function MapInventario() {
  const { client } = useAuthContext();
  const [umfs, setUmfs] = useState<any>();
  const [upas, setUpas] = useState<any>();
  const [uts, setUts] = useState<any>();
  const umf = useAppSelector((state: RootState) => state.umf);
  const upa = useAppSelector((state: RootState) => state.upa);

  const [selectedUmf, setSelectedUmf] = useState<OptionType>();
  const [selectedUpa, setSelectedUpa] = useState<OptionType>();
  const [selectedUt, setSelectedUt] = useState<OptionType>();

  const { poa } = useContext(PoaContext);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  )
  
  const utId = searchParams.get('utId') ?? 'all';

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const updateQueryString = useCallback(
    (name: string, value: string) => {
      params.set(name, value);

      return params.toString();
    },
    [params]
  );

  const selectUt = async (ut: any) => {
    dispatch(
      setUt({
        id: ut.value,
        numero_ut: ut.label,
      })
    );

    setSelectedUt(ut);
    router.push(
      `${pathname}?${updateQueryString(
        'utId',
        ut.value === '0' ? 'all' : ut.value
      )}`,
      { scroll: false }
    );
  };

  const loadUpas = async (
    inputValue: string,
    callback: (options: OptionType[]) => void
  ) => {
    const data = upas.filter((upa: any) =>
      upa?.descricao.toLowerCase().includes(inputValue.toLowerCase())
    );

    callback(
      data?.map((upa: any) => ({
        value: upa.id,
        label: upa.descricao,
      }))
    );
  };

  const loadUts = async (
    inputValue: string,
    callback: (options: OptionType[]) => void
  ) => {
    const data = uts.filter((ut: any) =>
      ut?.numero_ut.toString().includes(inputValue)
    );

    callback(
      data?.map((ut: any) => ({
        value: ut.id,
        label: ut.numero_ut,
      }))
    );
  };

  const loadUmfs = async (
    inputValue: string,
    callback: (options: OptionType[]) => void
  ) => {
    const data = umfs.filter((umf: any) =>
      umf?.nome.toLowerCase().includes(inputValue.toLowerCase())
    );

    callback(
      data?.map((umf: any) => ({
        value: umf.id,
        label: umf.nome,
      }))
    );
  };

  const defaultUmfsOptions = useCallback(async () => {
    const response = await client.get(`/umf?orderBy=nome&order=asc`);

    const { umfs } = response.data;
    setUmfs(umfs);

    const compareUmf = umfs ? umfs.find((u: any) => u.id === umf.id) : null;

    if (compareUmf) {
      setSelectedUmf({
        value: umf?.id,
        label: umf?.nome,
      });
    }

    if (umfs.length === 0) {
      setSelectedUmf({
        value: '0',
        label: 'Nenhuma UMF Cadastrada',
      });
    }
  }, [client, umf.id, umf?.nome]);

  const defaultUpasOptions = useCallback(async () => {
    const response = await client.get(
      `/upa?orderBy=descricao&order=asc&umf=${umf?.id}`
    );
    const { upas } = response.data;
    setUpas(upas);
    if (upas.length === 0) {
      setSelectedUpa({
        value: '0',
        label: 'Nenhuma UPA Cadastrada',
      });
    }

    const compareUpa = upas ? upas.find((u: any) => u.id === upa.id) : null;

    if (compareUpa) {
      setSelectedUpa({
        value: upa?.id,
        label: upa?.descricao,
      });
    }
  }, [client, umf?.id, upa?.descricao, upa.id]);

  const defaultUtsOptions = useCallback(async () => {
    const response = await client.get(
      `/ut?orderBy=nome&order=asc&upa=${upa?.id}`
    );
    const { uts } = response.data;
    setUts(uts);
    if (uts && uts.length === 0) {
      setSelectedUt({
        value: '0',
        label: 'Nenhuma UT Cadastrada',
      });
    }

    const utSel = utId !== 'all' ? uts.find((u: any) => u.id === utId) : null;

    if (utSel) {
      setSelectedUt({
        value: utSel?.id,
        label: utSel?.numero_ut.toString(),
      });
    }
  }, [client, upa?.id, utId]);

  const selectUmf = async (umf: any) => {
    dispatch(
      setUmf({
        id: umf.value,
        nome: umf.label,
      })
    );

    setSelectedUmf(umf);
    const response = await client.get(
      `/upa?orderBy=descricao&order=asc&umf=${umf.value}`
    );
    const { upas } = response.data;

    setUpas(upas);
  };

  const selectUpa = async (upa: any) => {
    const upaSelected = upas.find((u: any) => u.id === upa.value);

    dispatch(
      setUpa({
        id: upaSelected.id,
        descricao: upaSelected.descricao,
        tipo: Number.parseInt(upaSelected.tipo),
        srid: Number.parseInt(upaSelected.srid),
      })
    );

    setSelectedUpa(upa);

    const response = await client.get(
      `/ut?orderBy=nome&order=asc&upa=${upaSelected.id}`
    );
    const { uts } = response.data;

    setUts(uts);
  };

  function getUmfsDefaultOptions() {
    return umfs?.map((umf: any) => {
      return {
        label: umf.nome,
        value: umf.id,
      };
    });
  }

  function getUpasDefaultOptions() {
    return upas?.map((upa: any) => {
      return {
        label: upa.descricao,
        value: upa.id,
      };
    });
  }

  function getUtsDefaultOptions() {
    const data = uts?.map((ut: any) => {
      return {
        label: ut.numero_ut,
        value: ut.id,
      };
    });

    return [{ label: 'Todos', value: '0' }].concat(data);
  }

  const { error, data, isLoading } = useQuery({
    queryKey: ['geo-json', utId, upa],
    queryFn: () => getGeoJson(utId, upa?.id),
    placeholderData: keepPreviousData,
  });

  const loadData = useCallback(async () => {
    await defaultUmfsOptions();
    await defaultUpasOptions();
    await defaultUtsOptions();
  }, [defaultUmfsOptions, defaultUpasOptions, defaultUtsOptions]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center bg-custom-green rounded-lg my-4 mx-10 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full md:gap-4 px-4">
          <div>
            <Select
              styleLabel="text-white"
              initialData={{
                label: 'Selecione UMF...',
                value: '',
              }}
              selectedValue={selectedUmf}
              defaultOptions={getUmfsDefaultOptions()}
              options={loadUmfs}
              label="UMF:"
              callback={(e) => {
                selectUmf(e);
              }}
            />
          </div>
          <div>
            <Select              
              styleLabel="text-white"
              initialData={{
                label: 'Selecione UPA...',
                value: '',
              }}
              selectedValue={selectedUpa}
              defaultOptions={getUpasDefaultOptions()}
              options={loadUpas}
              label="UPA:"
              callback={(e: any) => {
                selectUpa(e);
              }}
            />
          </div>
          <div>
            <Select
              styleLabel="text-white"
              initialData={{
                label: 'Selecione UT...',
                value: '',
              }}
              selectedValue={selectedUt}
              defaultOptions={getUtsDefaultOptions()}
              options={loadUts}
              label="UT:"
              callback={selectUt}
            />
          </div>
        </div>
      </div>
      <div className="mx-10 -z-0 mb-4">
        <MapContainer
          style={{ height: '600px' }}
          center={[-1.975762, -52.934298]}
          zoom={7}
          scrollWheelZoom={true}
          className="-z-0"
        >
          <TileLayer
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={['mt0','mt1','mt2','mt3']}
            maxZoom={20}
          />
          <FullscreenControl />
          { data?.inventario?.features?.length > 0 && (
              <MarkerClusterGroup
                // spiderfyOnMaxZoom={false}
                // disableClusteringAtZoom={18}
                animate
                zoomToBoundsOnClick
                chunkedLoading
              >
                <GeoJsonInventario data={data?.inventario} />  
              </MarkerClusterGroup>
          ) }
          { data?.shape_ut?.features?.length > 0 && (
            <GeoJsonShapeUt data={data?.shape_ut} />
          )}
          <MinimapControl position={MinimapPosition.topright} />
        </MapContainer>
      </div>
    </div>
  );
}

export default MapInventario;
