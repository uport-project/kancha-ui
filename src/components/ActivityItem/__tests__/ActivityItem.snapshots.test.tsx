import * as React from 'react'
import { render, fireEvent } from 'react-native-testing-library'
import ActivityItem from '../ActivityItem'

const ATTACHMENT_1 = {
  key: 1,
  exp: 123445678910,
  subject: { shortId: 'Test Subject 1', did: '0x1efghssesd', profileImage: '' },
  issuer: { shortId: 'Test Issuer 1', did: '0x1efgh', profileImage: '' },
  attachmentType: 'Credential',
  fields: [
    {
      type: 'name',
      value: 'Test name',
    },
    {
      type: 'phone',
      value: 'Test phone',
    },
  ],
}

const ATTACHMENT_2 = {
  key: 2,
  subject: { shortId: 'Test Subject 2', did: '0x1efghssesdss', profileImage: '' },
  issuer: { shortId: 'Test Issuer 2', did: '0x1efghssss', profileImage: '' },
  attachmentType: 'Credential',
  fields: [
    {
      type: 'name',
      value: 'Test name',
    },
    {
      type: 'phone',
      value: 'Test phone',
    },
  ],
}

describe('Component(snapshots): ActivityItem', () => {
  const viewer = {
    did: 'ethr:did:123456876',
    profileImage: 'http://',
    shortId: 'Test Viewer',
  }
  const baseProps = {
    id: 'ZFGHFSJD',
    date: 123445678910,
    type: 'w3c.vc',
    issuer: {
      did: 'ethr:did:123456',
      profileImage: 'http://',
      shortId: 'Test Issuer',
    },
    subject: {
      did: 'ethr:did:123456',
      profileImage: 'http://',
      shortId: 'Test Subject',
    },
    activity: 'testing the components',
    profileAction: () => {},
  }

  it('should render with default required props', () => {
    const tree = render(<ActivityItem message={{ id: 'ZFGHFSJD' }} viewer={viewer} {...baseProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render with attachments', () => {
    const attachments = [ATTACHMENT_1, ATTACHMENT_2]
    const attachmentAction = jest.fn()

    const tree = render(
      <ActivityItem
        message={{ id: 'ZFGHFSJD' }}
        viewer={viewer}
        attachments={attachments}
        attachmentsAction={attachmentAction}
        {...baseProps}
      />,
    )
    expect(tree.toJSON).toMatchSnapshot()
  })

  it('should render with actions', () => {
    const actions = ['Confirm', 'Reject']
    const confirm = jest.fn()
    const reject = jest.fn()

    const tree = render(
      <ActivityItem
        {...baseProps}
        type={'sdr'}
        viewer={viewer}
        message={{ id: 'ZFGHFSJD' }}
        actions={actions}
        confirm={confirm}
        reject={reject}
      />,
    )
    expect(tree.toJSON).toMatchSnapshot()

    fireEvent.press(tree.getByText(/Confirm/i))
    expect(confirm).toHaveBeenCalledWith({ id: 'ZFGHFSJD' })

    fireEvent.press(tree.getByText(/Reject/i))
    expect(reject).toHaveBeenCalledWith({ id: 'ZFGHFSJD' })
  })
})
