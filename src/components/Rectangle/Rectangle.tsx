import {atomFamily, useRecoilState} from 'recoil'
import {selectedElementState} from '../../Canvas'
import {Drag} from '../Drag'
import {Resize} from '../Resize'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {style: ElementStyle}

export const elementState = atomFamily({
    key: 'element',
    default: {
        style: {
            position: {top: 0, left: 0},
            size: {width: 50, height: 50},
        },
    },
})

export const Rectangle = ({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)
    const [element, setElement] = useRecoilState(elementState(id))

    return (
        <RectangleContainer
            position={element.style.position}
            size={element.style.size}
            onSelect={() => setSelectedElement(id)}
        >
            <Resize
                selected={id === selectedElement}
                position={element.style.position}
                onResize={(style) => setElement({style})}
                size={element.style.size}
            >
                <Drag
                    position={element.style.position}
                    onDrag={(position) => {
                        setElement({
                            style: {
                                ...element.style,
                                position,
                            },
                        })
                    }}
                >
                    <div>
                        <RectangleInner selected={id === selectedElement} />
                    </div>
                </Drag>
            </Resize>
        </RectangleContainer>
    )
}
