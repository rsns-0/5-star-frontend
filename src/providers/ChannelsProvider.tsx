import { contextFactory } from "../lib/contextFactory"
import { type ChannelData } from "../types/types"

export const [ChannelProvider, useChannelContext] = contextFactory<ChannelData>()
