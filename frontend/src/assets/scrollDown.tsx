export function scrollDown(scrollRef: React.RefObject<HTMLDivElement>) {
  if (scrollRef?.current) {
    const chatContainer = scrollRef?.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}
