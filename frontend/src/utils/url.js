// ENTER YOUR EC2 PUBLIC IP/URL HERE
const ec2_url = ''
// CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
const ec2 = false;
// USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
export const url = ec2 ? ec2_url : 'localhost';