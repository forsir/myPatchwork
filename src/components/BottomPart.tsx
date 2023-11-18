import { Blanket } from './Blanket';
import { Menu } from './Menu';

export type BottomPartProps = {};

export function BottomPart(props: BottomPartProps) {
    return (
        <div>
            <Blanket />
            <Menu />
            <Blanket />
        </div>
    );
}
