import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  
  type PlacesProps = {
    setOffice: (position: google.maps.LatLngLiteral) => void;
  };

  export default function Places({ setOffice }: PlacesProps) {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (val: string) => {
      setValue(val, false);
      clearSuggestions();
  
      const results = await getGeocode({ address: val });
      const { lat, lng } = await getLatLng(results[0]);
      setOffice({ lat, lng });
    };
  
    return (
      <Combobox onSelect={handleSelect} className="my-2 space-x-2">
        <span>Localização: </span>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input border p-2 rounded-md w-5/12 hover:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:outline-none focus:ring-opacity-30"
          placeholder="Localização inicial da UT"
        />
        <ComboboxPopover className="z-40">
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  }