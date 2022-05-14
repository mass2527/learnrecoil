import {InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack} from '@chakra-ui/react'
import {selector, useRecoilState} from 'recoil'
import {selectedElementState} from './Canvas'
import {Element, elementState} from './components/Rectangle/Rectangle'

const selectedElementProperties = selector<Element | undefined>({
    key: 'selectedElementProperties',
    get: ({get}) => {
        const selectedElementId = get(selectedElementState)
        if (selectedElementId === null) return

        return get(elementState(selectedElementId))
    },
    set: ({get, set}, newElementProperties) => {
        const selectedElementId = get(selectedElementState)
        if (selectedElementId === null) return
        if (!newElementProperties) return

        set(elementState(selectedElementId), newElementProperties)
    },
})

type StyleProperty<T extends 'position' | 'size'> = {
    style: T
    property: T extends 'position' ? 'top' | 'left' : T extends 'size' ? 'width' | 'height' : never
    value: number
}

export const EditProperties = () => {
    const [elementProperties, setElementProperties] = useRecoilState(selectedElementProperties)
    if (!elementProperties) return null

    const setElementStyle = <T extends 'position' | 'size'>({style, property, value}: StyleProperty<T>) => {
        setElementProperties({
            ...elementProperties,
            style: {
                ...elementProperties.style,
                [style]: {
                    ...elementProperties.style[style],
                    [property]: value,
                },
            },
        })
    }

    return (
        <Card>
            <Section heading="Position">
                <Property
                    label="Top"
                    value={elementProperties.style.position.top}
                    onChange={(top) =>
                        setElementStyle({
                            style: 'position',
                            property: 'top',
                            value: top,
                        })
                    }
                />
                <Property
                    label="Left"
                    value={elementProperties.style.position.left}
                    onChange={(left) =>
                        setElementStyle({
                            style: 'position',
                            property: 'left',
                            value: left,
                        })
                    }
                />
            </Section>

            <Section heading="Size">
                <Property
                    label="Width"
                    value={elementProperties.style.size.width}
                    onChange={(width) =>
                        setElementStyle({
                            style: 'size',
                            property: 'width',
                            value: width,
                        })
                    }
                />
                <Property
                    label="Height"
                    value={elementProperties.style.size.height}
                    onChange={(height) =>
                        setElementStyle({
                            style: 'size',
                            property: 'height',
                            value: height,
                        })
                    }
                />
            </Section>
        </Card>
    )
}

const Section: React.FC<{heading: string}> = ({heading, children}) => {
    return (
        <VStack spacing={2} align="flex-start">
            <Text fontWeight="500">{heading}</Text>
            {children}
        </VStack>
    )
}

const Property = ({label, value, onChange}: {label: string; value: number; onChange: (value: number) => void}) => {
    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={value} onChange={(_, value) => onChange(value)}>
                    <NumberInputField borderRadius="md" />
                    <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
                </NumberInput>
            </InputGroup>
        </div>
    )
}

const Card: React.FC = ({children}) => (
    <VStack
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="white"
        padding={2}
        boxShadow="md"
        borderRadius="md"
        spacing={3}
        align="flex-start"
        onClick={(e) => e.stopPropagation()}
    >
        {children}
    </VStack>
)
