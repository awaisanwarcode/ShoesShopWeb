import { TopCatagories } from "./topcatagorgies";
import { SneakerSec } from "./sneaker";
import { NormalShoeSec } from "./normal";
import { SandelSec } from "./sandels";
import "./main.css";
export const Main = () => {
    return (
        <main id="AppMain">
            <TopCatagories />
            <SneakerSec />
            <SandelSec />
            <NormalShoeSec />
        </main >
    )
}