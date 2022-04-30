import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Canvas from './Canvas'
import {Box, ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {Atoms} from './components/Atoms'
import {Commissions, Selectors} from './components/Selectors'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ChakraProvider>
                <Router>
                    <Switch>
                        <Route path="/example/atoms">
                            <Atoms />
                        </Route>
                        <Route path="/example/selectors">
                            <Box padding={4}>
                                <Selectors />
                                <Commissions />
                            </Box>
                        </Route>
                        <Route>
                            <Canvas />
                        </Route>
                    </Switch>
                </Router>
            </ChakraProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
)
