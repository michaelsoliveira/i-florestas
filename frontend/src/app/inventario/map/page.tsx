'use client'

// import Map from "@/components/inventario/Map";
import withAuthentication from "@/components/utils/withAuthentication";
import dynamic from 'next/dynamic';
const Mapa = dynamic(() => import("@/components/maps/inventario/MapInventario"), { 
    ssr: false,
})

export default withAuthentication(Mapa)