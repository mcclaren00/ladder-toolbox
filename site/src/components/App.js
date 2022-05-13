import DataStore from '../abis/DataStore.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

const authorization = "Basic " + btoa(process.env.ID + ":" + process.env.SECRET);
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https', Headers: authorization 
})

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('No Ether on browser get Metamask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = DataStore.networks[networkId]
        if (networkData) {
            const datastore = new web3.eth.Contract(DataStore.abi, networkData.address)
            this.setState({ datastore })
            const filesCount = await datastore.methods.fileCount().call()
            this.setState({ filesCount })
            for (var i = filesCount; i >= 1; i--) {
                const file = await datastore.methods.files(i).call()
                this.setState({
                    files: [...this.state.files, file]
                })
            }
        } else {
            window.alert('DataStore contract not deployed')
        }
    }

    captureFile = event => {
        event.preventDefault()

        const file = event.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result),
                type: file.type,
                name: file.name
            })
            console.log('buffer', this.state.buffer)
        }
    }

    uploadFile = description => {
        console.log("Submitting file to IPFS")


        ipfs.add(this.state.buffer, (error, result) => {
            console.log('IPFS result', result.size)
            if (error) {
                console.error(error)
                return
            }

            this.setState({ loading: true })

            if (this.state.type === '') {
                this.setState({ type: 'none' })
            }
            this.state.datastore.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
                this.setState({
                    loading: false,
                    type: null,
                    name: null
                })
                window.location.reload()
            }).on('error', (e) => {
                window.alert('Error')
                this.setState({ loading: false })
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            datastore: null,
            files: [],
            loading: false,
            type: null,
            name: null
        }
        this.uploadFile = this.uploadFile.bind(this)
        this.captureFile = this.captureFile.bind(this)
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account} />
                {this.state.loading
                    ? <div id="loader" className="text-center mt-5"><p>Loading</p></div>
                    : <Main
                        files={this.state.files}
                        captureFile={this.captureFile}
                        uploadFile={this.uploadFile}
                    />
                }
            </div>
        );
    }
}

export default App;