import React, { useState } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import { useMutation, useQuery } from 'urql'

const createNewFF = `
  mutation ($name: String!) {
    insert_feature_flags_one(object: {name: $name}) {
        name
      }
  }
`;

const getAllMerchants = `
  query {
    merchant {
      id
      name
    }
  }
`;

type Merchant = {
  id: number;
  name: string;
}

const Merchant: NextPage = () => {
  const [createNewFeatureFlagResult, createNewFeatureFlag] = useMutation(createNewFF)
  const [name, setName] = useState('')

  const [result] = useQuery({
    query: getAllMerchants,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Merchant id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Merchant name
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.merchant.map((merchant: Merchant) => (
                  <tr key={merchant.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{merchant.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{merchant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/merchant/${merchant.id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">

                          Edit
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Merchant
