class Contact < ActiveRecord::Base

  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, uniqueness: true
  validates :phone, presence: true

end  