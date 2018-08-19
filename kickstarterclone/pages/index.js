import React, { Component } from 'react';
import factory from '../Ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component{

    //not used in React, this is Next.JS specific.
    static async getInitialProps() {
        //tries to get the initial data without
        //rendering the data because the process of
        // getting data is expensive with render()
        const campaigns =  await factory.methods.getDeployedCampaigns().call();

        return { campaigns };

        //If we were to do this with regular react,
        // we could just do async componentDidMount()
    }

    renderCampaigns() {
        const items = this.props.campaigns.map( address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }

    render(){
        return(
            <Layout>
                <div>
                <h3>Open Campaigns</h3>
                <Link route="/campaigns/new">
                    <a>
                        <Button
                        content="Create Campaign"
                        icon="add circle"
                        primary
                        floated="right"
                        />
                    </a>
                </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;