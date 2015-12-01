class Contact < ActiveRecord::Base

  validates :name, presence: true
  validates :email, uniqueness: true
  validates :phone, presence: true

end  