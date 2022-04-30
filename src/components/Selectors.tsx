import {Box, Input, HStack, VStack, FormControl, FormLabel, Switch} from '@chakra-ui/react'
import {atom, selector, useRecoilState} from 'recoil'

const krwState = atom({
    key: 'krw',
    default: 1000,
})

const EXCHANGE_RATE = 1263.49

const usdSelector = selector<number>({
    key: 'usd',
    get: ({get}) => {
        let krw = get(krwState)

        const isCommissionEnabled = get(isCommissionEnabledState)
        if (isCommissionEnabled) {
            const commissionRate = get(commissionRateState)
            krw = krw * (100 - commissionRate)
        }

        return krw * EXCHANGE_RATE
    },
    set: ({set, get}, newUsdValue) => {
        let newKrwValue = (newUsdValue as number) / EXCHANGE_RATE

        const isCommissionEnabled = get(isCommissionEnabledState)
        if (isCommissionEnabled) {
            const commissionRate = get(commissionRateState)
            newKrwValue = newKrwValue / (100 - commissionRate)
        }

        set(krwState, newKrwValue)
    },
})

export const Selectors = () => {
    const [krw, setKRW] = useRecoilState(krwState)
    const [usd, setUSD] = useRecoilState(usdSelector)

    return (
        <HStack>
            <VStack>
                <label htmlFor="krw">KRW</label>
                <Input
                    id="krw"
                    type="number"
                    value={krw}
                    onChange={(event) => setKRW(Number(event.currentTarget.value))}
                />
            </VStack>
            <VStack>
                <label htmlFor="urd">USD</label>
                <Input
                    id="urd"
                    type="number"
                    value={usd}
                    onChange={(event) => setUSD(Number(event.currentTarget.value))}
                />
            </VStack>
        </HStack>
    )
}

const isCommissionEnabledState = atom({key: 'isCommissionEnabled', default: false})
const commissionRateState = atom({key: 'commissionRate', default: 0})

export const Commissions = () => {
    const [isCommissionEnabled, setIsCommissionEnabled] = useRecoilState(isCommissionEnabledState)
    const [commissionRate, setCommissionRate] = useRecoilState(commissionRateState)

    return (
        <Box marginTop={4}>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="commission" mb="0">
                    Include forex commission?
                </FormLabel>
                <Switch
                    id="commission"
                    checked={isCommissionEnabled}
                    onChange={(event) => setIsCommissionEnabled(event.currentTarget.checked)}
                />
            </FormControl>
            <Input
                marginTop={2}
                id="urd"
                type="number"
                value={commissionRate}
                onChange={({currentTarget}) => {
                    const min = Number(currentTarget.min)
                    const max = Number(currentTarget.max)
                    const value = Number(currentTarget.value)

                    if (min <= value && value <= max) {
                        setCommissionRate(value)
                    }
                }}
                max={100}
                min={0}
            />
        </Box>
    )
}
