export function gmsParaDecimal(grau: number, min: number, seg: number, direct?: string): number {
    let dd = (grau + ((min == 0) ? 0 : min / 60)) + ((seg == 0) ? 0 : seg / 3600);
    
    if(direct === "S" || direct === "O")
        dd = -dd;
    
    return dd;
}

function parteInteira (valor: number) {
    if (valor >= 0.0) {
        return Math.floor (valor);
    } else {
        return Math.ceil (valor);
    }
}

function parteFracionaria (valor: number) {
    if (valor >= 0.0) {
        return valor - Math.floor (valor);
    } else {
        return valor - Math.ceil (valor);
    }
}


export function decimalParaGms(grau: number): string{
    const grauI = Math.abs(Math.trunc(grau))
    const grauF = parteFracionaria(grau);
    const min = parteInteira(Math.abs(grauF * 60));
    const minF = parteFracionaria(Math.abs(grauF) * 60);
    const seg = (Math.abs(grau) - grauI - min/60) * 3600;
    
    const strGrau = Math.abs(grauI) < 10 ? '0' + Math.abs(grauI) : Math.abs(grauI)
    const strMin = min < 10 ?  '0' + min : min
    const strSeg = seg < 10 ? '0' + String(Math.abs(seg).toFixed(3)) : Math.abs(seg).toFixed(3)
    const decimal = strGrau + "º " + strMin + "\' " + strSeg + "\""

    return decimal;
}

export function validateLatLng(latitude: number, longitude: number): void
  {
    if (latitude < -90.0 || latitude > 90.0 || longitude < -180.0
        || longitude >= 180.0)
    {
      throw new Error(
          "Legal ranges: latitude [-90,90], longitude [-180,180).");
    }

  }


    export function validarLatBr(coord: string): boolean {
        // 5.26; -33.74
        
        const coordConvertida = parseFloat(coord.replace(",", "."));
        
        if(coordConvertida <= 5.26 && coordConvertida >= -33.74)
            return true;
        else
            return false;
    }

    export function validarLonBr(coord: string): boolean {
        // -29.3; -73.99
        
        const coordConvertida = parseFloat(coord.replace(",", "."));
        
        if(coordConvertida <= -34.81 && coordConvertida >= -73.99)
            return true;
        else
            return false;
    }

