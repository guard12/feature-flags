import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useQuery, useMutation } from 'urql';

const getAllFF = `
  query {
    feature_flags {
      id
      name
    }
  }
`;

const createNewFF = `
  mutation ($name: String!) {
    insert_feature_flags_one(object: {name: $name}) {
        name
      }
  }
`;

const deleteFF = `
  mutation ($id: Int) {
    delete_feature_flags(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`;

type FF = {
    id: number;
    name: string;
}

const Add: NextPage = () => {
    const [createNewFeatureFlagResult, createNewFeatureFlag] = useMutation(createNewFF)
    const [ deleteFeatureFlagResult, deleteFeatureFlag ] = useMutation(deleteFF)
    const [ name, setName ] = useState('')
    const [ result, reexecuteQuery ] = useQuery({
        query: getAllFF,
      });
    
      const { data, fetching, error } = result;
    
      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;

      return (
        <div className="flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Feature name
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-600 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="feature" type="text" placeholder="NewLayout" />
            <button
              className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                if(name) {
                    createNewFeatureFlag({name: name})
                    reexecuteQuery()
                    setName('')
                }
            }}
              type="button"
            >
              Create
            </button>
          </div>
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
                      Feature Flag id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Feature Flag name
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.feature_flags.map((featrueFlag: FF) => (
                    <tr key={featrueFlag.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{featrueFlag.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{featrueFlag.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <svg onClick={() => {
                          deleteFeatureFlag({ id: featrueFlag.id })
                          reexecuteQuery()
                        }}
                          xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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

export default Add
