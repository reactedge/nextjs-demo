export class RuntimeConfigBuilder {
    build(): unknown {
        return {
            "integrations": {
                "magentoGraphql": {
                    "api": `${process.env.MAGENTO_URL}/graphql`
                }
            },
            "context": {
                "storeCode": "default",
                "sku": "WJ12",
                "category": "tops-men"
            }
        }
    }
}