import PrivacyPolicyClient from '@/UI/Components/PrivacyPolicyClient/PrivacyPolicyClient';

export async function generateMetadata() {
    return {
        title: `Privacy Policy - Furniture Mecca`,
        description: `Browse our Furniture Mecca collection`,
    };
}

const PrivacyPolicy = () => {
  return <PrivacyPolicyClient />
}

export default PrivacyPolicy