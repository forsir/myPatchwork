import { Blanket } from './Blanket';
import { Menu } from './Menu';

export type BottomPartProps = {};

export function BottomPart(props: BottomPartProps) {
    return (
        <div className="flex flex-row justify-around w-full">
            <Blanket />
            <Menu />
            <Blanket />
        </div>
    );
}
