import {atom, useRecoilState, useRecoilValue} from 'recoil'

const darkModeState = atom({
    key: 'darkMode',
    default: false,
})

const DarkModeSwitch = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState)

    return <input type="checkbox" checked={darkMode} onChange={(event) => setDarkMode(event.currentTarget.checked)} />
}

const Button = () => {
    const darkMode = useRecoilValue(darkModeState)

    return (
        <button
            type="button"
            style={{
                backgroundColor: darkMode ? '#000' : '#fff',
                color: darkMode ? '#fff' : '#000',
            }}
        >
            button
        </button>
    )
}

export const Atoms = () => {
    return (
        <div>
            <div>
                <DarkModeSwitch />
            </div>
            <div>
                <Button />
            </div>
        </div>
    )
}
