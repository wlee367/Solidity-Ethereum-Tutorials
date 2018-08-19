import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../Ethereum/factory';
import web3 from '../../Ethereum/web3';
import Layout from '../../components/Layout';
import { Router } from '../../routes';

class CampaignNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minimumContribution: '',
            errorMessage: '',
            loading: false
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();

        this.setState({laoding: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    //don't have to specify gas amount from browser
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({laoding: false});
    }

    render() {
        return(
            <Layout>
                <h3>Create a Campaign</h3>

                {/* !!"string" turns the string into true lol */}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.laoding} primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}
export default CampaignNew;