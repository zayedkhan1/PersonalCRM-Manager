import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

const CONTACTS_STORAGE_PREFIX = 'offlinecrm_contacts_'

export const ContactContext = createContext()

export function ContactProvider({ children }) {
  const { user } = useContext(AuthContext)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(CONTACTS_STORAGE_PREFIX + user.id)
      setContacts(saved ? JSON.parse(saved) : [])
    } else {
      setContacts([])
    }
  }, [user])

  const saveContacts = newContacts => {
    setContacts(newContacts)
    if (user) {   
      
      localStorage.setItem(CONTACTS_STORAGE_PREFIX + user.id, JSON.stringify(newContacts))
    }
  }

  // CRUD operations
  const addContact = contact => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      history: [`Created on ${new Date().toLocaleString()}`],
      completedFollowUp: false,
    }
    saveContacts([newContact, ...contacts])
  }

  const updateContact = (id, updatedData) => {
    const newContacts = contacts.map(c => {
      if (c.id === id) {
        return {
          ...c,
          ...updatedData,
          history: [...(c.history || []), `Edited on ${new Date().toLocaleString()}`]
        }
      }
      return c
    })
    saveContacts(newContacts)
  }

  const deleteContact = id => {
    saveContacts(contacts.filter(c => c.id !== id))
  }

  const bulkDelete = ids => {
    saveContacts(contacts.filter(c => !ids.includes(c.id)))
  }

  const bulkUpdateTags = (ids, tagsToAdd = []) => {
    const newContacts = contacts.map(c => {
      if (ids.includes(c.id)) {
        const newTags = [...new Set([...(c.tags || []), ...tagsToAdd])]
        return { ...c, tags: newTags }
      }
      return c
    })
    saveContacts(newContacts)
  }

  return (
    <ContactContext.Provider value={{
      contacts,
      addContact,
      updateContact,
      deleteContact,
      bulkDelete,
      bulkUpdateTags,
      setContacts,
    }}>
      {children}
    </ContactContext.Provider>
  )
}
