export function scrollDown(scrollRef: React.Ref<number | null>) {
  if (scrollRef?.current) {
    const chatContainer = scrollRef?.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}
