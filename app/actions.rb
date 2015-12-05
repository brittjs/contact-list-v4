# Homepage (Root path)
get '/' do
  erb :index
end
#list all
get '/contacts' do
  Contact.all.to_json
end
#create contact
post '/contacts' do
  results = {result: false}
  firstname = params[:firstname]
  lastname = params[:lastname]
  email = params[:email]
  phone = params[:phone]
  contact = Contact.new firstname: firstname, lastname: lastname, email: email, phone: phone
  p contact
  if contact.save
    results[:result] = true
    results[:contact] = {id: contact.id}
  end
  results.to_json
end
#show contact details
get '/contacts/:id' do
  contact = Contact.find params[:id]
  contact.to_json
end
# delete
delete '/contacts/:id' do |id|
  contact = Contact.find(id)
  contact.destroy
  Contact.all.to_json
end


