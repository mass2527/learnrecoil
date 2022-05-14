import {InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack} from '@chakra-ui/react'
import {selectorFamily, useRecoilState, useRecoilValue} from 'recoil'
import {selectedElementState} from './Canvas'
import {elementState} from './components/Rectangle/Rectangle'
import _ from 'lodash'
import produce from 'immer'

const selectedElementProperty = selectorFamily<number, {id: number; path: string}>({
    key: 'selectedElementProperty',
    get:
        ({id, path}) =>
        ({get}) => {
            const selectedElement = get(elementState(id))
            return _.get(selectedElement, path)
        },
    set:
        ({id, path}) =>
        ({get, set}, newValue) => {
            const selectedElement = get(elementState(id))
            const newElementProperty = produce(selectedElement, (draft) => {
                _.set(draft, path, newValue)
            })
            set(elementState(id), newElementProperty)
        },
})

export const EditProperties = () => {
    const selectedElementId = useRecoilValue(selectedElementState)
    if (selectedElementId === null) return null

    return (
        <Card>
            <Section heading="Position">
                <Property label="Top" path="style.position.top" id={selectedElementId} />
                <Property label="Left" path="style.position.left" id={selectedElementId} />
            </Section>
            <Section heading="Size">
                <Property label="Width" path="style.size.width" id={selectedElementId} />
                <Property label="Height" path="style.size.height" id={selectedElementId} />
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

const Property = ({id, label, path}: {id: number; label: string; path: string}) => {
    const [value, setValue] = useRecoilState(selectedElementProperty({id, path}))
    if (value === undefined) return null

    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={value} onChange={(_, value) => setValue(value)}>
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
