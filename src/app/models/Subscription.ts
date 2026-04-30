export class Subscription
{

Subscription_Id :number; 
Subscription_Name :string; 
Duration :number ;
Subscription_Amount :number ;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

