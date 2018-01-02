use bucket_list;

db.dropDatabase();

db.countries.insert([{
  name:"scotland",
  notes:"none"
}])
