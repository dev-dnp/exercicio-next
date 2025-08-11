import { ReactNode } from "react";

const styles = {
    loadingContainer: {
        position: 'absolute' as const,
        backgroundColor: "black",
        inset: "0",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        zIndex: "999"
    },
}

type Props = {
    children: ReactNode
}

export default function LoadingPage({children}:Props){
    return (
        <div style={styles.loadingContainer}>
            <div style={{textAlign: "center"}}>
                <img width={50} src="/loading-gif.gif" alt="Carregando a página..." />
                <p>{children ?? "Carregando..."}</p>
            </div>
        </div>
    );
}