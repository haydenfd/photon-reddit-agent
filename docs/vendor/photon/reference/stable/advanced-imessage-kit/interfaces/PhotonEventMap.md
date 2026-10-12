> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# PhotonEventMap

## Properties

<ResponseField name={"chat-read-status-changed"} type={"{ chatGuid: string; read: boolean }"} required />

<ResponseField name={"config-update"} type={"Record<string, unknown>"} required />

<ResponseField name={"connect"} type={"undefined"} required />

<ResponseField name={"disconnect"} type={"undefined"} required />

<ResponseField name={"error"} type={"Error"} required />

<ResponseField name={"ft-call-status-changed"} type={"FaceTimeStatusData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/FaceTimeStatusData"} required />

<ResponseField name={"group-icon-changed"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"group-icon-removed"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"group-name-change"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"hello-world"} type={"undefined"} required />

<ResponseField name={"imessage-aliases-removed"} type={"string[]"} required />

<ResponseField name={"incoming-facetime"} type={"string"} required />

<ResponseField name={"log"} type={"{ level: string; message: string; tag: string }"} required />

<ResponseField name={"message-send-error"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"message-updated"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"new-findmy-location"} type={"FindMyLocationItem"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/FindMyLocationItem"} required />

<ResponseField name={"new-message"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"new-server"} type={"string"} required />

<ResponseField name={"participant-added"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"participant-left"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"participant-removed"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />

<ResponseField name={"ready"} type={"undefined"} required />

<ResponseField name={"scheduled-message-created"} type={"ScheduledMessageData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ScheduledMessageData"} required />

<ResponseField name={"scheduled-message-deleted"} type={"ScheduledMessageData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ScheduledMessageData"} required />

<ResponseField name={"scheduled-message-error"} type={"ScheduledMessageData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ScheduledMessageData"} required />

<ResponseField name={"scheduled-message-sent"} type={"ScheduledMessageData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ScheduledMessageData"} required />

<ResponseField name={"scheduled-message-updated"} type={"ScheduledMessageData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ScheduledMessageData"} required />

<ResponseField name={"server-update"} type={"ServerUpdateData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ServerUpdateData"} required />

<ResponseField name={"server-update-downloading"} type={"ServerUpdateData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ServerUpdateData"} required />

<ResponseField name={"server-update-installing"} type={"ServerUpdateData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/ServerUpdateData"} required />

<ResponseField name={"settings-backup-created"} type={"BackupData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/BackupData"} required />

<ResponseField name={"settings-backup-deleted"} type={"BackupData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/BackupData"} required />

<ResponseField name={"settings-backup-updated"} type={"BackupData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/BackupData"} required />

<ResponseField name={"theme-backup-created"} type={"BackupData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/BackupData"} required />

<ResponseField name={"theme-backup-deleted"} type={"BackupData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/BackupData"} required />

<ResponseField name={"theme-backup-updated"} type={"BackupData"} typeHref={"/reference/stable/advanced-imessage-kit/interfaces/BackupData"} required />

<ResponseField name={"typing-indicator"} type={"{ display: boolean; guid: string }"} required />

<ResponseField name={"updated-message"} type={"MessageResponse"} typeHref={"/reference/stable/advanced-imessage-kit/types/MessageResponse"} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.