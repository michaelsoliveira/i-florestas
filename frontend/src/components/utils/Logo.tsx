import Image from "next/legacy/image";

interface props {
    width: number;
    height: number;
}

const Logo = ({ width, height }: props) => {
    return (
        <Image src='/imgs/logo_bomanejo.png' alt="" width={width} height={height}/>
    )
}

export default Logo