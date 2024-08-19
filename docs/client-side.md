# GraphQL 學習筆記 - client side

承接[基礎篇](./basic.md)的內容，本篇會更深入的介紹 GraphQL Client 的建置。

GraphQL 可以用多種語言實現，下面範例使用 Typescript、React 與 Apollo 展示。

## 初始化

使用 terminal 進行套件安裝

```bash
npm install @apollo/client graphql
```

### 設置 GraphQL

引入必要工具

```typescript
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
```

服務實體化

```typescript
const client = new ApolloClient({
  uri: 'https://path/to/graphql/service',
  cache: new InMemoryCache(),
});
```

使用 Provider 讓整個 app 可以存取 graphql 資料

```tsx
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

### Typescript

為了自動根據 schema 產生 Typescript 需要的 type 安裝套件 codegen

```bash
npm install -D typescript graphql @graphql-codegen/cli @graphql-codegen/client-preset @graphql-typed-document-node/core
```

設定 codegen config，在專案 root 位置新增 `codegen.ts`

```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://path/to/graphql/service',
  documents: ['src/**/*.{ts,tsx}'], // 自動為符合路徑的query建立type
  generates: {
    './src/__generated__/': {
      // 設定自動產生的檔案放置位置
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
```

調整 package.json

```json
  "scripts": {
    "postinstall": "npm run generate",
    "test": "vitest",
    "start": "vite",
    "build": "vite build",
    "generate": "graphql-codegen" // 新增
  },
```

運行 codegen

```bash
npm run generate
```

就會在 `src/\_\_generated\_\_` 產生對應工具與型別。

## 使用

GraphQL 的操作(operation)基礎有兩種 `query` 用來查詢資料， `mutation` 用來修改資料，下面會依序說明。

###

### Schema

```graphql
type User {
  id: ID!
  name: String!
  vehicles: [Vehicle]!
}

enum VehicleType {
  CAR
  SCOOTER
}

type Vehicle {
  id: ID!
  type: VehicleType!
  model: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: CreateUserInput!): CreateUserResponse!
}

input CreateUserInput {
  name: String!
}

type CreateUserResponse {
  code: Int!
  message: String!
  success: Boolean!
  user: User
}
```

###

### Query

不論使用 `query` 還是 `mutation` 我們都需要使用 GraphQL 的查詢語言。

```typescript
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';

// 按照慣例操作都會用SNAKE_CASE命名
const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      name
      vehicles {
        id
        type
      }
    }
  }
`);
```

我們透過自動產生的 `gql` 建立操作，literal 第一行的 `query` 表明這是一個查詢行為， `GetUsers` 為這個查詢行為命名，codegen 會根據這個名稱與查詢內容建立相對應的 `GetUserQuery` type 提供使用， `users` 必須是後端提供的查詢進入點。

接著我們在希望進行查詢的 component 中使用 `useQuery` hook

```tsx
export function UsersPage() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <ul>
            {user.vehicles.map((vehicle) => (
              <li key={vehicle.id}>{vehicle.type}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

與 React Query 或是 useSWR 類似，`useQuery` 會返回一個物件，包含 `loading`、`error`、`data` 三個屬性，分別代表請求狀態、錯誤訊息、資料，我們可以根據這些狀態進行 UI 的渲染。

### Mutation

與 `query` 類似，我們也需要使用 GraphQL 的查詢語言，並且配合 `useMutation` hook 進行操作。

```tsx
import { useState } from 'react';
import { gql } from '../__generated__';
import { useMutation } from '@apollo/client';

const CREATE_USER = gql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      code
      message
      success
      user {
        id
        name
      }
    }
  }
`);

const CreateUser = () => {
  const [name, setName] = useState('');
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);

  const handleCreateUser = () => {
    createUser({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUser;
```

與 `useQuery` 不同，`useMutation` 會返回一個陣列，第一個元素是一個函數，用來觸發 mutation，第二個元素與 `useQuery` 類似，是一個物件，包含 `loading`、`error`、`data` 三個屬性， `useMutation` 並不會主動觸發 mutation，需要透過返回的函數進行觸發。

### Apollo Client

在上面的例子中，我們使用了 `useQuery` 與 `useMutation` 這兩個 Apollo client 提供的 hooks，由於先前已經在最外層設置了 ApolloProvider，除了進行操作，Apollo client 還為我們提供了多樣的 cache 策略，讓我們面對不同的場景可以有不同的解決方案。
