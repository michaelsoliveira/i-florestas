export function gmsParaDecimal(grau: string, min: string, seg: string, direct: string): number {
    const grauC = parseFloat(grau);
    const minC = parseFloat(min);
    const segC = parseFloat(seg);
    
    let dd = (grauC + ((minC == 0) ? 0 : minC / 60)) + ((segC == 0) ? 0 : segC / 3600);
    
    if(direct === "S" || direct === "O")
        dd = -dd;
    
    return dd;
}

export function parteInteira (valor: number): number {
    if (valor >= 0.0) {
        return Math.floor (valor);
    } else {
        return Math.ceil (valor);
    }
}
export function parteFracionaria (valor: number): number {
    if (valor >= 0.0) {
        return valor - Math.floor (valor);
    } else {
        return valor - Math.ceil (valor);
    }
}

export function decimalParaGms(grau: number): string{
    
    const grauF = parteFracionaria(grau);
    const min = parteInteira(Math.abs(grauF * 60)) ;
    const minF = parteFracionaria(grauF * 60);
    const seg = parteFracionaria(minF) * 60;
    //double result = grauI + min + seg;
    const decimal = Math.abs(grau) + "º " + min + "\' " + Math.abs(seg) + "\""

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

