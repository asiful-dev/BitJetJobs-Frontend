import Image from "next/image";

const Logo = () => {
    return (
        <Image
            src="/logo.svg"
            alt="Logo"
            className="w-10 h-10"
        />
    )
}

export default Logo;