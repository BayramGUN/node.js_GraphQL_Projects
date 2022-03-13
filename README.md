# node.js_GraphQL_Projects

## Projeyi, 
```
npm run dev

```
komutu ile ayağa kaldırınız.


## Çalıştırılacak örnek GraphQL sorgusu:

```
query event{
  event(id:"4"){
    id
    title
    user_id
    user {
      id
      username
      email
    }
    location {
      id
      name
      lat
      lng
    }
    participant {
      id
      event_id
      user_id
    }
  }
}
```