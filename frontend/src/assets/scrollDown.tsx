export function scrollDown(scrollRef: React.Ref<number | null>) {
  console.log(scrollRef);
  if (scrollRef?.current) {
    const chatContainer = scrollRef?.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}
